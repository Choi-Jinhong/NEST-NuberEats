import { Field, ObjectType } from '@nestjs/graphql';

// 데이터 베이스의 모델을 의미하는 파일
@ObjectType()
export class Restaurant {
  @Field((type) => String)
  name: string;
  @Field((type) => Boolean, { nullable: true })
  isGood?: boolean;
}
