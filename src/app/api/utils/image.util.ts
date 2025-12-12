import { ApiRoutes } from "../api-routes";

export function getImageUrl(imageId: number | undefined): string {
    return imageId ? ApiRoutes.attachment.getImage(imageId) : '';
}