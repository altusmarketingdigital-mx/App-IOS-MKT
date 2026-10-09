import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Supplier } from './Supplier';

@Entity('supplier_payments')
export class SupplierPayment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Supplier, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn()
    date: Date;
}
