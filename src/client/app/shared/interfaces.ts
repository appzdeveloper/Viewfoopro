export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    state: IState;
    orderTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    customerId: number;
    orderItems: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    productName: string;
    itemCost: number;
}

//------------ LITasksFrontEnd
export interface User {
    id: string,
    pkuid: number;
    username: string;
    email: string;
    fullname: string;
    usertype: string;
    phone: string;
    fkcoid: string;
}

export interface Project {
    pkproid: number;
    proname: string;
    prodesc: string;
}

export interface Task {
    pktaskid: number;
    tasktitle: string;
    taskdescription: string;
}

export interface Viewfoo {
    viewfootitle:string;
    viewfootype:string;
    userid:string;
    id:string;
    containers: Array<Container>;
    imagewatermark: string;
    coverimage: string;
    thumbcoverimage: string;
}

export interface Container {
    containertitle:string;
    containertype:string;
    id:string;
    userid:string;
    viewfooid:string;
    containerimages: Array<ContainerImage>;

}

export interface ContainerImage {
    id:string;
    imagename:string;
    containerid: string
    viewfooid:string;
    userid:string;
}
export interface Folder{
    id:string;
    parentid:string;
    foldername:string;
    userid:string;
    foldertype:string;

}
