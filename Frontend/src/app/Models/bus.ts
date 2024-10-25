export class Bus {
    id?: number;
    busNumber: string;
    busType: string;
    arrTime: string;
    deptTime: string;
    operator: string;
    price:number;
    route_id:number;
   
    constructor(
      busNumber: string,
      busType: string,
      arrTime: string,
      deptTime: string,
      operator: string,
      price:number,
      routeId:number,
      id?: number
      
    ) {
      this.busNumber = busNumber;
      this.busType = busType;
      this.arrTime = arrTime;
      this.deptTime = deptTime;
      this.operator = operator;
      this.id = id;
      this.route_id=routeId;
      this.price=price;
    }
  }
  