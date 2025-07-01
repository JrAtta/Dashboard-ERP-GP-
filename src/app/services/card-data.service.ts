import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/Icard';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  constructor() { }

  cardData:ICard[] =
  // [
  //     {
  //     "title": "Total Sales",
  //     "value": 42524,
  //     "change": -0.06,
  //     "changeLabel": "vs Last Month",
  //     "icon": "shopping-cart",
  //     "color":"var(--blue-sidebar)",
  //   },
  //     {
  //       "title": "Total Expenses",
  //       "value": 50983,
  //       "change": -0.06,
  //       "changeLabel": "vs Last Month",
  //       "icon": "credit-card",
  //       "color":"var(--mauve-sidebar)",
  //     },
  //     {
  //       "title": "New Orders",
  //       "value": 42524,
  //       "change": -0.06,
  //       "changeLabel": "vs Last Month",
  //       "icon": "shopping-bag",
  //       "color":"var(--green-sidebar)",
  //     },
  //     {
  //       "title": "Active Employees",
  //       "value": 42524,
  //       "change": 0.06,
  //       "changeLabel": "vs Last Month",
  //       "icon": "people",
  //       "color":"var(--orange-sidebar)",
  //     }
  //   ]
   [
  {
    title: "Total Sales",
    value: 49524,
    previous: 45238,
    change:0, // initial value
    changeLabel: "vs Last Month",
    icon: "shopping-cart",
    color: "var(--blue-sidebar)",
  },
  {
    title: "Total Expenses",
    value: 50983,
    previous: 58237,
    change:0, // initial value
    changeLabel: "vs Last Month",
    icon: "credit-card",
    color: "var(--mauve-sidebar)",
  },
  {
    title: "New Orders",
    value: 22356,
    previous: 24238,
    change:0, // initial value
    changeLabel: "vs Last Month",
    icon: "shopping-bag",
    color: "var(--green-sidebar)",
  },
  {
    title: "Active Employees",
    value: 42524,
    previous: 40117,
    change:0, // initial value
    changeLabel: "vs Last Month",
    icon: "people",
    color: "var(--orange-sidebar)",
  },
];

}
