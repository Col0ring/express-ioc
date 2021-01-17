import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  title: string

  @Column('text')
  description: string

  @Column('text')
  content: string

  @Column('int')
  views: number
}
