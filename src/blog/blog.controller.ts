import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiCreatedResponse({ type: Blog })
  async create(@Body() createBlogDto: CreateBlogDto) {
    return new Blog(await this.blogService.create(createBlogDto));
  }

  @Get()
  @ApiOkResponse({ type: Blog, isArray: true })
  async findAll() {
    const posts = await this.blogService.findAll();
    return posts.map((post) => new Blog(post));
  }

  @Get('drafts')
  @ApiOkResponse({ type: Blog, isArray: true })
  async createDraft() {
    const drafts = await this.blogService.findDrafts();
    return drafts;
  }

  @Get(':id')
  @ApiOkResponse({ type: Blog })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = new Blog(await this.blogService.findOne(id));
    if (!post) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return post;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Blog })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return new Blog(await this.blogService.update(id, updateBlogDto));
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: Blog })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new Blog(await this.blogService.remove(id));
  }
}
