import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client';

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column('decimal', { precision: 12, scale: 2 })
    subtotal: number;

    @Column('decimal', { precision: 12, scale: 2 })
    taxes: number;

    @Column('decimal', { precision: 12, scale: 2 })
    total: number;

    @Column({ type: 'varchar', default: 'Pending' })
    status: string; // Pending, Converted, Cancelled

    @CreateDateColumn()
    created_at: Date;
}
