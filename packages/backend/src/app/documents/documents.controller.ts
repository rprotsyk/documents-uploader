import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Document } from './document.entity';

@Controller('documents')
export class DocumentsController {
  constructor(@InjectRepository(Document) private documentsRepository: Repository<Document>) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file, @Body('url') url: string): Promise<void> {
    if (!file && !url) {
      throw new HttpException('Please provide a file or URL', HttpStatus.BAD_REQUEST);
    }

    const document = new Document();
    if (file) {
      document.name = file.originalname;
      document.content = file.buffer;
    } else {
      document.name = url;
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        document.content = response.data;
      } catch (error) {
        console.error(error);
        throw new HttpException('Error downloading document from URL', HttpStatus.BAD_REQUEST);
      }
    }

    try {
      await this.documentsRepository.save(document);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error saving document to database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}