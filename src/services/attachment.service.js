import Attachment from "../models/attachment.model.js";

class AttachmentService {
    constructor() {
        this.AttachmentModel = Attachment;
    }

    async singleUploadToLocal(file) {
        try {
            if (!file) {
                throw new Error("No file uploaded");
            }
            const newAttachment = await this.AttachmentModel.insertOne({
                filename: file.filename,
                path: file.path,
            });
            return newAttachment;
        } catch (error) {
            throw new Error(`Error uploading single file: ${error.message}`);
        }
    }

    async multipleUploadToLocal(files) {
        try {
            const attachments = files.map(item => ({
                filename: item.filename,
                path: item.path,
            }));
            if (!attachments || attachments.length === 0) {
                throw new Error("No attachments uploaded");
            }
            const newAttachments = await this.AttachmentModel.insertMany(attachments);
            return newAttachments;
        } catch (error) {
            throw new Error(`Error uploading multiple files: ${error.message}`);
        }
    }
}

export default new AttachmentService();