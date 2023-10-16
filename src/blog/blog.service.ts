import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  create(createBlogDto: CreateBlogDto) {
    const { title, body } = createBlogDto;
    return this.prisma.post.create({ data: { title, body: body || '' } });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  findDrafts() {
    this.prisma.post.findMany({ where: { published: false } });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.post.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
