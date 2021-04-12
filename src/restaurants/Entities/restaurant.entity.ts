import { Field, ObjectType } from '@nestjs/graphql';

// 데이터 베이스의 모델을 의미하는 파일
@ObjectType()
export class Restaurant {
  @Field((type) => String)
  name: string;
  
  @Field((type) => Boolean) // nullable: null 값 가능을 나타내는 옵션
  isVegan?: boolean;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  ownerName: string;
}
