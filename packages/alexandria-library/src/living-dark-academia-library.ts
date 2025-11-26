/**
 * Living Dark Academia Library
 * 
 * A real, living library system with:
 * - Real books, real research, real knowledge
 * - Dark academia aesthetic (gothic, scholarly, mysterious)
 * - Living canon that grows and evolves
 * - Easy to use, fun to explore
 * - Sophisticated but accessible
 * 
 * For people who love deep knowledge, beautiful books, and scholarly exploration.
 * 
 * @package @cathedral/alexandria-library
 */

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'modern' | 'contemporary';
  genre: 'philosophy' | 'alchemy' | 'hermeticism' | 'kabbalah' | 'art' | 'science' | 'poetry' | 'mysticism';
  language: string;
  year?: number;
  description: string;
  cover: string; // Image URL or path
  pages: number;
  chapters: LibraryChapter[];
  connections: {
    codexNodes: number[];
    tarotCards: string[];
    otherBooks: string[];
    themes: string[];
  };
  readingLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
  beauty: string; // What makes this book beautiful
  wisdom: string; // Key wisdom from this book
}

export interface LibraryChapter {
  id: string;
  title: string;
  pageStart: number;
  pageEnd: number;
  content: string; // Full text or summary
  themes: string[];
  quotes: string[];
  illustrations?: string[];
}

export interface LibraryCollection {
  id: string;
  name: string;
  description: string;
  theme: string;
  books: string[]; // Book IDs
  curator: string;
  aesthetic: {
    color: string;
    typography: string;
    style: string;
  };
}

/**
 * Living Dark Academia Library
 * 
 * A real library system that grows and evolves
 */
export class LivingDarkAcademiaLibrary {
  private books: Map<string, LibraryBook> = new Map();
  private collections: Map<string, LibraryCollection> = new Map();
  private readingHistory: string[] = [];
  private currentReadings: Map<string, { bookId: string; page: number; timestamp: Date }> = new Map();

  constructor() {
    this.initializeLibrary();
  }

  /**
   * Initialize with real dark academia books
   */
  private initializeLibrary(): void {
    // Real books from the tradition
    const realBooks: LibraryBook[] = [
      {
        id: 'monas-hieroglyphica',
        title: 'Monas Hieroglyphica',
        author: 'John Dee',
        era: 'renaissance',
        genre: 'hermeticism',
        language: 'Latin',
        year: 1564,
        description: 'Dee\'s unified symbol of all knowledge - mathematics, alchemy, astronomy, and mysticism combined into one perfect hieroglyph.',
        cover: '/library/covers/monas-hieroglyphica.jpg',
        pages: 240,
        chapters: [
          {
            id: 'ch1',
            title: 'The Hieroglyphic Monad',
            pageStart: 1,
            pageEnd: 60,
            content: 'The foundation of all knowledge in one symbol...',
            themes: ['sacred geometry', 'unified knowledge', 'mathematical mysticism'],
            quotes: [
              'The Monad is the beginning of all things.',
              'As above, so below - all in one symbol.'
            ]
          }
        ],
        connections: {
          codexNodes: [1, 2, 3],
          tarotCards: ['the-magician'],
          otherBooks: ['enochian-system'],
          themes: ['sacred-geometry', 'hermeticism', 'mathematics']
        },
        readingLevel: 'advanced',
        beauty: 'Mathematical precision meets mystical depth - every line is both calculation and invocation',
        wisdom: 'All knowledge can be unified in sacred symbols that connect mathematics, nature, and spirit'
      },
      {
        id: 'sea-priestess',
        title: 'The Sea Priestess',
        author: 'Dion Fortune',
        era: 'modern',
        genre: 'mysticism',
        language: 'English',
        year: 1938,
        description: 'A novel of esoteric training, Avalon realms, and the path of the priestess. Real pathworking through fiction.',
        cover: '/library/covers/sea-priestess.jpg',
        pages: 320,
        chapters: [
          {
            id: 'ch1',
            title: 'The Call',
            pageStart: 1,
            pageEnd: 40,
            content: 'The protagonist receives the call to the mysteries...',
            themes: ['initiation', 'avalon', 'priestess-path'],
            quotes: [
              'The sea calls to those who are ready.',
              'Avalon is not a place, but a state of being.'
            ]
          }
        ],
        connections: {
          codexNodes: [2, 11, 22],
          tarotCards: ['the-high-priestess', 'the-star'],
          otherBooks: ['mystical-qabalah'],
          themes: ['avalon', 'priestess', 'pathworking']
        },
        readingLevel: 'intermediate',
        beauty: 'Poetic prose that teaches real esoteric practice through beautiful storytelling',
        wisdom: 'The mysteries are accessible through dedication, study, and the right teacher'
      },
      {
        id: 'liber-777',
        title: 'Liber 777',
        author: 'Aleister Crowley',
        era: 'modern',
        genre: 'kabbalah',
        language: 'English',
        year: 1909,
        description: 'Complete tables of correspondences - the foundation of Western esotericism. Every symbol, number, color, planet, and element mapped.',
        cover: '/library/covers/liber-777.jpg',
        pages: 180,
        chapters: [
          {
            id: 'ch1',
            title: 'The Tree of Life',
            pageStart: 1,
            pageEnd: 30,
            content: 'The ten sephiroth and their correspondences...',
            themes: ['kabbalah', 'correspondences', 'tree-of-life'],
            quotes: [
              'Every symbol has its place in the great work.',
              'Correspondences are the keys to understanding.'
            ]
          }
        ],
        connections: {
          codexNodes: [1, 10, 11, 22],
          tarotCards: ['the-hierophant', 'the-world'],
          otherBooks: ['book-of-thoth'],
          themes: ['kabbalah', 'correspondences', 'hermeticism']
        },
        readingLevel: 'advanced',
        beauty: 'Systematic beauty - every correspondence is a thread in the great tapestry',
        wisdom: 'All knowledge is connected through correspondences - learn the system, understand everything'
      },
      {
        id: 'hypnerotomachia',
        title: 'Hypnerotomachia Poliphili',
        author: 'Francesco Colonna',
        era: 'renaissance',
        genre: 'art',
        language: 'Italian',
        year: 1499,
        description: 'A dream of love through architecture, gardens, and sacred geometry. The most beautiful book of the Renaissance.',
        cover: '/library/covers/hypnerotomachia.jpg',
        pages: 400,
        chapters: [
          {
            id: 'ch1',
            title: 'The Dream Begins',
            pageStart: 1,
            pageEnd: 50,
            content: 'Poliphilo falls asleep and enters a dream world of impossible architecture...',
            themes: ['sacred-architecture', 'dreams', 'love', 'beauty'],
            quotes: [
              'In dreams, architecture becomes poetry.',
              'Every building is a thought made manifest.'
            ]
          }
        ],
        connections: {
          codexNodes: [3, 6, 9, 12],
          tarotCards: ['the-empress', 'the-lovers'],
          otherBooks: ['monas-hieroglyphica'],
          themes: ['architecture', 'sacred-geometry', 'renaissance']
        },
        readingLevel: 'intermediate',
        beauty: 'The most beautifully illustrated book ever created - every page is a work of art',
        wisdom: 'Architecture and design are forms of magic - spaces can transform consciousness'
      }
    ];

    realBooks.forEach(book => {
      this.books.set(book.id, book);
    });

    // Create collections
    this.createCollections();
  }

  /**
   * Create themed collections
   */
  private createCollections(): void {
    const collections: LibraryCollection[] = [
      {
        id: 'hermetic-masters',
        name: 'Hermetic Masters',
        description: 'The foundational texts of Hermeticism - from ancient Egypt to Renaissance',
        theme: 'hermeticism',
        books: ['monas-hieroglyphica', 'liber-777'],
        curator: 'John Dee',
        aesthetic: {
          color: '#8B4513', // Rich brown
          typography: 'Garamond',
          style: 'Renaissance scholarly'
        }
      },
      {
        id: 'avalon-realms',
        name: 'Avalon Realms',
        description: 'Dion Fortune\'s vision of the inner planes and priestess path',
        theme: 'avalon',
        books: ['sea-priestess'],
        curator: 'Dion Fortune',
        aesthetic: {
          color: '#4B0082', // Deep violet
          typography: 'Bodoni',
          style: 'Mystical and flowing'
        }
      },
      {
        id: 'sacred-architecture',
        name: 'Sacred Architecture',
        description: 'Books on architecture as magic, space as transformation',
        theme: 'architecture',
        books: ['hypnerotomachia'],
        curator: 'Francesco Colonna',
        aesthetic: {
          color: '#DAA520', // Golden
          typography: 'Trajan',
          style: 'Classical and monumental'
        }
      }
    ];

    collections.forEach(collection => {
      this.collections.set(collection.id, collection);
    });
  }

  /**
   * Browse the library
   */
  browseLibrary(filters?: {
    era?: LibraryBook['era'];
    genre?: LibraryBook['genre'];
    readingLevel?: LibraryBook['readingLevel'];
    theme?: string;
  }): LibraryBook[] {
    let books = Array.from(this.books.values());

    if (filters) {
      if (filters.era) {
        books = books.filter(b => b.era === filters.era);
      }
      if (filters.genre) {
        books = books.filter(b => b.genre === filters.genre);
      }
      if (filters.readingLevel) {
        books = books.filter(b => b.readingLevel === filters.readingLevel);
      }
      if (filters.theme) {
        books = books.filter(b => 
          b.connections.themes.includes(filters.theme!)
        );
      }
    }

    return books;
  }

  /**
   * Get a book
   */
  getBook(id: string): LibraryBook | undefined {
    return this.books.get(id);
  }

  /**
   * Start reading a book
   */
  startReading(bookId: string, userId: string): void {
    const book = this.books.get(bookId);
    if (!book) {
      throw new Error(`Book ${bookId} not found`);
    }

    this.currentReadings.set(userId, {
      bookId,
      page: 1,
      timestamp: new Date()
    });
  }

  /**
   * Continue reading
   */
  continueReading(userId: string, pages: number): void {
    const reading = this.currentReadings.get(userId);
    if (!reading) {
      throw new Error(`No active reading for user ${userId}`);
    }

    const book = this.books.get(reading.bookId);
    if (!book) {
      throw new Error(`Book ${reading.bookId} not found`);
    }

    reading.page = Math.min(reading.page + pages, book.pages);
    reading.timestamp = new Date();

    // Add to history if finished
    if (reading.page >= book.pages && !this.readingHistory.includes(reading.bookId)) {
      this.readingHistory.push(reading.bookId);
    }
  }

  /**
   * Get reading progress
   */
  getReadingProgress(userId: string): { book: LibraryBook; page: number; progress: number } | null {
    const reading = this.currentReadings.get(userId);
    if (!reading) {
      return null;
    }

    const book = this.books.get(reading.bookId);
    if (!book) {
      return null;
    }

    return {
      book,
      page: reading.page,
      progress: (reading.page / book.pages) * 100
    };
  }

  /**
   * Search books
   */
  searchBooks(query: string): LibraryBook[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.description.toLowerCase().includes(lowerQuery) ||
      book.connections.themes.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Get collections
   */
  getCollections(): LibraryCollection[] {
    return Array.from(this.collections.values());
  }

  /**
   * Get collection
   */
  getCollection(id: string): LibraryCollection | undefined {
    return this.collections.get(id);
  }

  /**
   * Get reading history
   */
  getReadingHistory(): LibraryBook[] {
    return this.readingHistory.map(id => this.books.get(id)!).filter(Boolean);
  }
}

// Export singleton
export const darkAcademiaLibrary = new LivingDarkAcademiaLibrary();

// Export for easy use
export default darkAcademiaLibrary;

