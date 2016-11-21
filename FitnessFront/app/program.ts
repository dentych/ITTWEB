export class Exercise {
    
}

export class Program {
    constructor(public id: string, public title: string, public completed: number, public exercises: Exercise[]) {

    }
}