export const util = {
    slugify: (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s]/g, '')     // Remove special characters
            .replace(/\s+/g, '-');           // Replace spaces with dashes
    },
    isGibberish(input: string): boolean {
        const trimmed = input.trim();

        // Reject if less than 3 characters
        if (trimmed.length < 3) return true;

        // Reject if no vowels (very likely gibberish)
        if (!/[aeiou]/i.test(trimmed)) return true;

        // Reject if all digits or symbols
        if (/^[^a-zA-Z]+$/.test(trimmed)) return true;

        // Optional: allow only letters, numbers and space
        if (!/^[a-zA-Z0-9 ]+$/.test(trimmed)) return true;

        return false;
    }
}