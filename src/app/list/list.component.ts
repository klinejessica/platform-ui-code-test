import { Component, OnInit } from '@angular/core';
import { Provider } from '../provider';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  selectedProvider: Provider;

  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  constructor() { }

  ngOnInit() {
    // Load selected list after page relod
    if (localStorage.getItem("selected")) {
      this.selectedProviders = JSON.parse(localStorage.getItem("selected"));
    } else {
      // No data, start with an empty array
      this.selectedProviders = [];
    }
    if (localStorage.getItem("unselected")) {
      this.unselectedProviders = JSON.parse(localStorage.getItem("unselected"));
    } 

  }


  //add provider to Selected provider list and remove from Avaiable list
  addProvider(provider: Provider) {
    this.selectedProviders.push(provider);
    localStorage.setItem("selected", JSON.stringify(this.selectedProviders));
    localStorage.setItem("unselected", JSON.stringify(this.unselectedProviders));
     this.removeAvailableProvider(provider.id);
    return this.unselectedProviders;
   

  }

  // remove provider from selected list & save list in case of reload
  removeProvider(provider: Provider, id) {
    this.selectedProviders.splice(id, 1);
    this.unselectedProviders.push(provider);
    localStorage.setItem("unselected", JSON.stringify(this.unselectedProviders));
    localStorage.setItem("selected", JSON.stringify(this.selectedProviders));

  }

  // remove provider from avaiable list once selected
  removeAvailableProvider(id){
    const  itemToRemove = this.unselectedProviders.findIndex(i => i.id ===id)
    if(itemToRemove >=0 ){
      this.unselectedProviders.splice(itemToRemove, 1);
    }
    localStorage.setItem("unselected", JSON.stringify(this.unselectedProviders));
   
  }


}
