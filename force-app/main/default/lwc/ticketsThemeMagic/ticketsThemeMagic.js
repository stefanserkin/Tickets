import { LightningElement } from 'lwc';
import { loadStyle } from "lightning/platformResourceLoader";
import ticketThemeMagic from '@salesforce/resourceUrl/TicketsThemeSylesheet';

export default class TicketsThemeMagic extends LightningElement {
    connectedCallback() {
        loadStyle(this, ticketThemeMagic);
    }
}