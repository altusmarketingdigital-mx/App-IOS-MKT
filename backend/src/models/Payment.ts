import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderSale } from './OrderSale';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => OrderSale, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: OrderSale;

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'varchar' })
    payment_method: string;

    @CreateDateColumn()
    date: Date;
}
