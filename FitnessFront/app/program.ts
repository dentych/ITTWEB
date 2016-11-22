export class Exercise {
    constructor(title: string,
                description: string,
                sets: number,
                reps: number) {
    }
}

export class Program {
    constructor(public _id: string, public title: string, public completed: number, public exercises: Exercise[]) {

    }
}