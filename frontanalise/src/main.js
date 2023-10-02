import {compile, createApp} from 'vue';
import App from './App.vue'
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Calendar from 'primevue/calendar';
import Tooltip from 'primevue/tooltip';
import TabMenu from 'primevue/tabmenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';



const app = createApp(App);

app.component('InputNumber', InputNumber)
app.component('MultiSelect', MultiSelect)
app.component('InputSwitch', InputSwitch)
app.component('Dialog', Dialog )
app.component('Menubar', Menubar )
app.component('TabMenu', TabMenu)
app.component('Calendar', Calendar)
app.component('DataTable', DataTable)
app.component('InputText', InputText)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Card', Card)
app.component('Button', Button)
app.component('Sidebar', Sidebar)


app.directive('tooltip', Tooltip);


app.use(PrimeVue);



app.mount('#app');
