/**
 * 이미지 없는 텍스트 전용 시스템으로 전환됨에 따라 더 이상 이미지를 로드하지 않습니다.
 */
export const examImages: { [key: string]: any } = {};

export const ImageService = {
  getImage: (imageName: string | null) => null
};