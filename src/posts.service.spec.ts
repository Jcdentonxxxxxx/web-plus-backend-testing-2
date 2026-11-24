import { PostsService } from './posts.service';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

describe('PostsService', () => {
	let postsService: PostsService;

	beforeEach(() => {
		postsService = new PostsService();
	});

	describe('.findMany', () => {
		const posts = [
			{ text: 'Post 1' },
			{ text: 'Post 2' },
			{ text: 'Post 3' },
			{ text: 'Post 4' }
		];

		beforeEach(() => {
			posts.forEach((post) => postsService.create(post));
		});

		it('should return all posts if called without options', () => {
			const found = postsService.findMany({});
			expect(found).toHaveLength(4);
			expect(found[0].text).toBe('Post 1');
			expect(found[found.length - 1].text).toBe('Post 4');
		});

		it('should return correct posts for skip and limit options', () => {
			const found = postsService.findMany({ skip: 2, limit: 1 });
			expect(found).toHaveLength(1);
			expect(found[0].text).toBe('Post 3');
		});

		it('should return correct posts for only skip option', () => {
			const found = postsService.findMany({ skip: 1 });

			expect(found).toHaveLength(3);
			expect(found[0].text).toBe('Post 2');
			expect(found[found.length - 1].text).toBe('Post 4');
		});

		it('should return correct posts for only limit option', () => {
			const found = postsService.findMany({ limit: 2 });

			expect(found).toHaveLength(2);
			expect(found[0].text).toBe('Post 1');
			expect(found[1].text).toBe('Post 2');
		});

		it('should return empty array when skip exceeds posts count', () => {
			const found = postsService.findMany({ skip: 10 });

			expect(found).toHaveLength(0);
		});

		it('should return all posts when limit exceeds posts count', () => {
			const found = postsService.findMany({ limit: 10 });

			expect(found).toHaveLength(4);
		});

		it('should return all posts for skip 0', () => {
			const found = postsService.findMany({ skip: 0 });

			expect(found).toHaveLength(4);
		});

		it('should return empty array for limit 0', () => {
			const found = postsService.findMany({ limit: 0 });

			expect(found).toHaveLength(0);
		});
	});
});
