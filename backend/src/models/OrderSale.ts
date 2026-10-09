import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client';
import { Quote } from './Quote';

@Entity('orders_sales')
export class OrderSale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => Quote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'quote_id' })
    quote: Quote;

    @Column('decimal', { precision: 12, scale: 2 })
    total: number;

    @Column({ default: 'Pending' })
    status: string; // Pending, In Process, Delivered, Cancelled

    @CreateDateColumn()
    created_at: Date;
}
