/**
 * @description transform json Data to FormData
 * @param data
 */

export default function transformToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
}
