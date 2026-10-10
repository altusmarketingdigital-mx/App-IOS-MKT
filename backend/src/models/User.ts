import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', default: 'Empleado' })
    role: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    // WebAuthn Passkey (Huella/FaceID)
    @Column({ type: 'text', nullable: true })
    credential_id: string;

    @Column({ type: 'text', nullable: true })
    public_key: string; // Para FIDO2 real, aunque para simplificar podemos validar solo si existe el credential_id

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
