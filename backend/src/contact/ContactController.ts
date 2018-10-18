import * as Boom from "boom";
import * as Hapi from "hapi";
import * as Response from "../responses";
import { IUserProfile } from "../user/UserProfile";
import ProfileRepository from "../user/UserProfileRepository";
import { Contact, IContact } from "./Contact";
import ContactRepository from "./ContactRepository";

class ContactController {

    public async index(req: Hapi.Request) {
        try {
            const contacts = await ContactRepository.findByUser(req.auth.credentials.id);
            return contacts.map((contact) => contact.toResponse());
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public async get(req: Hapi.Request) {
        try {
            const { contactId } = req.params;
            const contact = ContactRepository.findById(contactId);
            return contact;
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public async add(req: Hapi.Request) {
        const contact = Contact.parse(req.payload as IContact);
        const createdContact = await ContactRepository.create(contact);
        const createdPopulatedContact = await ContactRepository.findOneByAndPopulate(createdContact.id);
        return Response.success(createdPopulatedContact);
    }

    public async addByEmail(req: Hapi.Request) {
        const { email } = req.payload as any;

        try {
            const profile = await ProfileRepository.findOne({ email });
            const contact = new Contact(profile, req.auth.credentials);
            const newContact = await ContactRepository.create(contact);

            const createdPopulatedContact = await ContactRepository.findOneByAndPopulate(newContact.id);
            return Response.success(createdPopulatedContact);
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }

    }

    public async update(req: Hapi.Request) {
        const contact: Contact = Contact.parse(req.payload as IContact);
        const updatedContact = await ContactRepository.update(contact.id, contact);
        return Response.success(updatedContact);
    }

    public async delete(req: Hapi.Request) {
        const { contactId } = req.params;
        if (!contactId) {
            return Boom.badRequest("E_NOT_FOUND");
        }

        await ContactRepository.delete(contactId);
        return Response.success(contactId);
    }

}

export default new ContactController();
