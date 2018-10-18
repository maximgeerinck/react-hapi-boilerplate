import mongoose from "../db";
import { MongoRepository } from "../models/Repository";
import ContactModel, { Contact, IContact } from "./Contact";

class ContactRepository extends MongoRepository<Contact> {
    constructor() {
        super(ContactModel, "Contact");
    }

    public findByUser(userId: string) {
        return this.model.find({ from: userId, profile: { $ne: null } }).populate("from profile")
            .then((daos) => {
                console.log(daos);
                return daos.map((dao) => Contact.parse(dao.toJSON()));
            });
    }

    public findOneByAndPopulate(profileId: string) {
        return this.model.findOne({ id: profileId }).populate("from profile")
            .then((dao) => Contact.parse(dao.toJSON()));
    }
}

export default new ContactRepository();
