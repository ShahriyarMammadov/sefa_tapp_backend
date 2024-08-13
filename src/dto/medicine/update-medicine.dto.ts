import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateMedicineDto {
  @ApiProperty({ example: 'Aksenfort', description: 'Name of the medicine' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 4.5, description: 'Rating of the medicine' })
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({
    example:
      'https://s3-alpha-sig.figma.com/img/6629/d16f/3fcc766c97ee70d73216524ed2ddef3d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cmA01uRsMl6YDTVxlonVj7dVspvUwThYHmL6iS6EgPO1OyPnctuwyWKMj9ueGjYi37Q-uHMSwB0GGt--3~ApNKrujt2bRORdDuHL71PbHOQG2lxBvgdkwAsyzGuRzuyxVoZgfeI9an2FJlDrwQkAzwFBoZ8ocTo~BPvbWtv9XBsSAGzWXwh2UuymfQkhltxgVsDe5BrYZPLV3w0j4XGvp3ttxlWe6rEGDG5LXNBlIedTp18bztRIqnPIg28FyLmaIuUikf336GsakYF7LDIpwxL0KBTBCfgozmNA8TFanDZH6zUk4phmIcNNFoOQ0RwMx6m-rhkh82w1-rWnR2IYtg__',
    description: 'Image URL of the medicine',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty({
    example: 'A top health medicine...',
    description: 'About the medicine',
  })
  @IsString()
  @IsNotEmpty()
  readonly about: string;

  @ApiProperty({
    example: 'medicine price',
    description: 'price the medicine',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
