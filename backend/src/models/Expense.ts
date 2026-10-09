import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum PaymentMethod {
    CASH = 'Cash',
    DEBIT = 'Debit',
    CREDIT = 'Credit'
}

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: PaymentMethod })
    payment_method: PaymentMethod;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    date: Date;
}
