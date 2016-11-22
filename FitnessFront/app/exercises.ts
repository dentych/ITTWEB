export class ExerciseInfo {
    constructor(public title: string,
                public description: string) {
    }
}

export const EXERCISES = [
    new ExerciseInfo(
        "Pushup",
        "You push yourself up and down with thy arms."
    ),
    new ExerciseInfo(
        "Lunges",
        "Keep your upper body straight, with your shoulders back and relaxed and chin up \
        (pick a point to stare at in front of you so you don't keep looking down). Always engage your core. \
        Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle."
    ),
    new ExerciseInfo(
        "Right plank",
        "Lie on your right side and support your body with your elbow. Lift bækkenet until the body is fully streched."
    ),
    new ExerciseInfo(
        "Left plank",
        "Lie on your left side and support your body with your elbow. Lift bækkenet until the body is fully streched."
    ),
    new ExerciseInfo(
        "Squat",
        "Stand straight with feet hip-width apart. Stand with your feet apart, directly under your hips, and place your hands on your hips.\
        Tighten your stomach muscles. Lower down, as if sitting and then straighten your legs."
    )
];