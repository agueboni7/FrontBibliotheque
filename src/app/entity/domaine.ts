
export class Category{
  public idCat:number=0;
  constructor(public libele:string){}
}

export class Costumer{
  public id:number=0;
  constructor(public nom: string, public prenom: string,
    public profession: string, public postal: string,
     public mail:string, public datAjout:number){}
}

export class Book{
  public idBo:number=0;
  constructor(public isbn:string, public titre:string, public datSortie:Date,
     public nombre:number, public auteur:string, public category:Category){}
}

export class Loan{
  public idL:number=0;
  constructor(public datDeb: Date, public datFin: Date, public typeInPlace: boolean, public book: Book,
    public costumer: Costumer, public typeOp: string, public abocostumer:AboCostumer){}
}

export class Abonnement{
  public idA:number=0;
  constructor(public code: string, public validite:number, public montant:number, public nbrLivre:number){}
}

export class AboCostumer{
  public idAC:number=0;
  constructor(public datDebAC: Date, public datFinAC: Date, public satut: boolean, public statutAbo: string,
     public costumer: Costumer, public abonnement: Abonnement){}
}

export class Email{
  constructor( public cosmail:string, public datSend:Date, public object:string, public msg:string){}
}

