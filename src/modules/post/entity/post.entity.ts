import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
    nullable: false
  })
  title: string

  @Column('text')
  description: string

  @Column('text', {
    nullable: false
  })
  content: string

  @Column('int', {
    default: 0
  })
  views: number
}
