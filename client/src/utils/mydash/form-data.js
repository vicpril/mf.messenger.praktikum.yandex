export function getFormData(formData) {
    return [...formData.entries()]
        .reduce(
            (obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }), {}
        );
}