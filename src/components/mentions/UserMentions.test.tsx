import { getUserMention, cleanUserMentionsHtml } from './UserMentions';

describe('UserMentions utility functions', () => {
  it('getUserMention returns correct mention for valid user link', () => {
    const url = 'https://d2jam.com/u/testuser';
    expect(getUserMention(url)).toBe('@testuser@d2jam.com');
  });

  it('getUserMention returns null for invalid user link', () => {
    const url = 'https://other.com/u/testuser';
    expect(getUserMention(url)).toBeNull();
  });

  it('cleanUserMentionsHtml replaces user links with mention format', () => {
    const html = '<a href="https://d2jam.com/u/testuser">https://d2jam.com/u/testuser</a>';
    expect(cleanUserMentionsHtml(html)).toBe('<a href="https://d2jam.com/u/testuser">@testuser@d2jam.com</a>');
  });

  it('cleanUserMentionsHtml leaves non-user links unchanged', () => {
    const html = '<a href="https://other.com/u/testuser">https://other.com/u/testuser</a>';
    expect(cleanUserMentionsHtml(html)).toBe(html);
  });
});