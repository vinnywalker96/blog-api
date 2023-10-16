import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class Blog implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: false })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null;

  @ApiProperty({ required: false, nullable: true })
  author?: UserEntity | null;

  constructor({ author, ...data }: Partial<Blog>) {
    Object.assign(this, data);
    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
