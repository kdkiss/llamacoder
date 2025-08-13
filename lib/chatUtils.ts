


/**
 * Parse comma-separated tags string into an array
 * @param tagsString Comma-separated tags string
 * @returns Array of tags
 */
export function parseTags(tagsString: string | null): string[] {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
}

/**
 * Convert array of tags to comma-separated string
 * @param tagsArray Array of tags
 * @returns Comma-separated tags string
 */
export function stringifyTags(tagsArray: string[]): string {
  return tagsArray.filter(tag => tag.trim().length > 0).join(',');
}

/**
 * Add a tag to a comma-separated tags string
 * @param tagsString Current comma-separated tags string
 * @param newTag Tag to add
 * @returns Updated comma-separated tags string
 */
export function addTag(tagsString: string | null, newTag: string): string {
  const tags = parseTags(tagsString);
  if (!tags.includes(newTag)) {
    tags.push(newTag);
  }
  return stringifyTags(tags);
}

/**
 * Remove a tag from a comma-separated tags string
 * @param tagsString Current comma-separated tags string
 * @param tagToRemove Tag to remove
 * @returns Updated comma-separated tags string
 */
export function removeTag(tagsString: string | null, tagToRemove: string): string {
  const tags = parseTags(tagsString);
  return stringifyTags(tags.filter(tag => tag !== tagToRemove));
}


