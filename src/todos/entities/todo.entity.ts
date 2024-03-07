import { User } from "src/users/entities/user.entity";
import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    description: string;

    @ManyToOne(() => User, (user) => user.todos)
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date

}
