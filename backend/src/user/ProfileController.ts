import * as Boom from "boom";
import * as fs from "fs-extra";
import * as Hapi from "hapi";
import * as path from "path";
import * as uuid from "uuid/v4";
import * as Response from "../responses";
import ProfileRepository from "../user/UserProfileRepository";
import * as ImageHelper from "../utils/ImageHelper";
import ValidationError from "../validation/ValidationError";
import Validator from "../validation/Validator";
import { stripUrl } from "./ProfileHelper";
import { IUserProfile, UserProfile } from "./UserProfile";

class ProfileController {

    public async index(req: Hapi.Request) {
        try {
            const profiles = await ProfileRepository.findByUser(req.auth.credentials.id);
            return profiles.map((profile) => profile.toResponse());
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public async get(req: Hapi.Request) {
        try {
            const { profileId } = req.params;
            const profile = await ProfileRepository.findById(profileId);
            return profile.toResponse();
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public async save(req: Hapi.Request) {
        try {
            const profile = UserProfile.parse(req.payload as IUserProfile);
            profile.user = req.auth.credentials;

            const savedProfile = ((req.payload as any).id)
                ? await ProfileRepository.update(profile.id, profile)
                : await ProfileRepository.create(profile);

            // profile created, time to move the images to the correct folder
            const oldDir = path.join(__dirname + "/../../public/tmp", req.auth.credentials.id);
            const newDir = path.join(__dirname + "/../../public/profiles", req.auth.credentials.id);

            if (profile.iconProfile && fs.existsSync(path.join(oldDir, stripUrl(profile.iconProfile.thumbnail)))) {
                await fs.move(path.join(oldDir, stripUrl(profile.iconProfile.thumbnail)), path.join(newDir, stripUrl(profile.iconProfile.thumbnail)));
                await fs.move(path.join(oldDir, stripUrl(profile.iconProfile.original)), path.join(newDir, stripUrl(profile.iconProfile.original)));
            }
            if (profile.iconCompany && fs.existsSync(path.join(oldDir, stripUrl(profile.iconCompany.thumbnail)))) {
                await fs.move(path.join(oldDir, stripUrl(profile.iconCompany.thumbnail)), path.join(newDir, stripUrl(profile.iconCompany.thumbnail)));
                await fs.move(path.join(oldDir, stripUrl(profile.iconCompany.original)), path.join(newDir, stripUrl(profile.iconCompany.original)));
            }

            await fs.emptyDir(oldDir);

            return Response.success(savedProfile.toResponse());
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }

    }

    public async update(req: Hapi.Request) {
        const Profile: UserProfile = UserProfile.parse(req.payload as IUserProfile);
        const updatedProfile = await ProfileRepository.update(Profile.id, Profile);
        return Response.success(updatedProfile.toResponse());
    }

    public async delete(req: Hapi.Request) {
        const { ProfileId } = req.params;
        if (!ProfileId) {
            return Boom.badRequest("E_NOT_FOUND");
        }

        await ProfileRepository.delete(ProfileId);
        return Response.success(ProfileId);
    }

    public async uploadIcon(req: Hapi.Request) {

        const validator = new Validator();

        try {
            const { icon } = (req.payload as any);
            const { profileId } = req.params;

            const ext = ImageHelper.getExt(icon.hapi.filename);
            const name = `img-${uuid()}`;

            const dir = path.join(__dirname + "/../../public/tmp", req.auth.credentials.id);
            await fs.ensureDir(dir);

            const imagePath = path.join(dir, `${name}.${ext}`);
            const thumbnailPath = path.join(dir, `${name}_50.${ext}`);

            const writeStream = fs.createWriteStream(imagePath);
            const writeStreamSmall = fs.createWriteStream(thumbnailPath);

            icon.pipe(writeStream);
            ImageHelper.resizeImage(icon).pipe(writeStreamSmall);

            // validate image
            const isValid = await ImageHelper.isValidImage(icon);
            if (!isValid) {
                validator.addError(new ValidationError("icon", "image.invalidType"));

                fs.unlinkSync(imagePath);
                fs.unlinkSync(thumbnailPath);

                return validator.generateBadRequest();
            }

            return {
                success: true, image: {
                    thumbnail: `http://localhost:5000/assets/tmp/${req.auth.credentials.id}/${name}_50.${ext}`,
                    original: `http://localhost:5000/assets/tmp/${req.auth.credentials.id}/${name}.${ext}`
                }
            };
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

}

export default new ProfileController();
