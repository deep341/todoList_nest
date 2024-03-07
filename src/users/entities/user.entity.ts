import { Todo } from "src/todos/entities/todo.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        nullable: false,
        select: false
    })
    password: string

    @Column()
    location: string

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}


