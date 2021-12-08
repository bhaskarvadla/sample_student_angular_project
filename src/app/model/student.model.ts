export class Student {
    id: number;
    student_id: number;
    student_name: String;
    student_email: String;
    student_branch: String;

    constructor(id: number,
        student_id: number,
        student_name: String,
        student_email: String,
        student_branch: String) {
        this.id = id;
        this.student_id = student_id;
        this.student_name = student_name;
        this.student_email = student_email;
        this.student_branch = student_branch;
    }
}
