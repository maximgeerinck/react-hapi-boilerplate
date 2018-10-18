import * as React from "react";
import Input from "../components/form/Input";
import Form from "../components/form/Form";
import formStyles from "../forms.scss"
import profileStyles from "./profilePage.scss";

class ProfileForm extends React.Component {

    change = (name, value) => {
        if (this.props.onChange) {
            return this.props.onChange(name, value);
        }
    }

    upload = async (type, e) => {
        const image = await this.props.onUpload(type, e.target.files[0]);
        this.props.onChange(type, image);
    };

    renderImage(type) {
        return this.props.data && this.props.data[type] ? this.props.data[type].original : undefined;
    }

    render() {

        return (
            <Form className={formStyles.form} data={this.props.data} onChange={this.change} validation={this.props.validation}>

                <div className={profileStyles.editProfileLogo}>
                    <img src={this.renderImage("iconProfile")} />
                    <Input name="iconProfile" label="Profile Icon" type="file" onChange={(e) => this.upload("iconProfile", e)} />
                </div>

                <div className={profileStyles.details}>
                    <Input name="name" label="Name" className={profileStyles.name} placeholder="John Doe" />
                    <Input name="function" label="Staff manager" className={profileStyles.function} placeholder="Function" />
                </div>

                <div className={profileStyles.editCompanyLogo}>
                    <img src={this.renderImage("iconCompany")} />
                    <Input name="iconCompany" label="Company Logo" type="file" onChange={(e) => this.upload("iconCompany", e)} />
                </div>

                <div className={profileStyles.other}>
                    <Input name="telephone" label="Telephone" />
                    <Input name="companyName" label="Company Name" />
                    <Input name="companySubheader" label="Sub title" />
                    <Input name="email" label="Email" />
                    <Input name="website" label="Website" />
                    <Input name="logo" label="Logo" />
                    <Input name="profilePicture" label="Profile picture" />
                    <Input name="socialMedia" label="Social Media" />
                    <Input name="btwNr" label="Btw Nr." />
                    <Input name="bankAccountNumber" label="Bank account number" />
                    <Input name="address" label="Address" />
                </div>
            </Form>
        )
    }
}

export default ProfileForm;