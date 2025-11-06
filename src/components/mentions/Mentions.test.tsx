import Mentions, { extractLetter, getMentionType, cleanMentionsHtml, getMentionText } from './Mentions';

jest.mock('./UserMentions', () => ({
  cleanUserMentionsHtml: jest.fn((html) => `<mocked>${html}</mocked>`),
  getUserMention: jest.fn((text) => `@mockeduser@d2jam.com`),
}));

describe('Mentions utility functions', () => {
  it('extractLetter should return the correct letter from a valid URL', () => {
    const url = 'https://d2jam.com/u/username';
    expect(extractLetter(url)).toBe('u');
  });

  it('extractLetter should return null for invalid URL', () => {
    const url = 'https://other.com/u/username';
    expect(extractLetter(url)).toBeNull();
  });

  it('getMentionType should return MentionType.User for user mention', () => {
    const url = 'https://d2jam.com/u/username';
    expect(getMentionType(url)).toBe('user');
  });

  it('getMentionType should return null for non-user mention', () => {
    const url = 'https://d2jam.com/x/username';
    expect(getMentionType(url)).toBeNull();
  });

  it('getMentionText should return correct text for user mention', () => {
    const url = 'https://d2jam.com/u/mockeduser';
    const type = getMentionType(url);
    expect(getMentionText(url, type as any)).toBe('@mockeduser@d2jam.com');
  });


  it('getMentionText returns null when type is null', () => {
    const url = 'https://d2jam.com/x/mockeduser';
    const type = getMentionType(url);
    expect(getMentionText(url, type as any)).toBeNull();
  });

  it('cleanMentionsHtml should call cleanUserMentionsHtml', () => {
    const html = '<span>@mocked@d2jam.com</span>';
    expect(cleanMentionsHtml(html)).toBe('<mocked><span>@mocked@d2jam.com</span></mocked>');
  });
});










