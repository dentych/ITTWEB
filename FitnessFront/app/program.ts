export class Exercise {
    constructor(public _id: string,
                public title: string,
                public description: string,
                public sets: number,
                public reps: number) {
    }
}

export class Program {
    constructor(public _id: string, public title: string, public completed: number, public exercises: Exercise[]) {

    }
}