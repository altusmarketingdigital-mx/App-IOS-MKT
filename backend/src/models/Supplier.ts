import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    contact_info: string;

    @Column('decimal', { precision: 12, scale: 2, default: 0 })
    initial_debt: number;

    @CreateDateColumn()
    created_at: Date;
}
