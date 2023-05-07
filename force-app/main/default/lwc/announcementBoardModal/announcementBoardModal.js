import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AnnouncementBoardModal extends LightningModal {
    @api name;
    @api highlights;
    @api details;

    handleOkay() {
        this.close('okay');
    }

}