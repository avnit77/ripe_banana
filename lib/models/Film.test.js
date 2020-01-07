const Film = require('./Film');
const Studio = require('./Studio');
const Actor = require('./Actor');

describe('Film model', () => {
  const studio = new Studio({
    name: 'Film Name'
  });

  const actor = new Actor({
    name: 'Actor Name'
  });

  it('requires a title', () => {
    const film = new Film({
      studio: {
        _id: studio.id,
        name: 'Studio Name'
      },
      released: 2020,
      cast: [{
        role: 'Star',
        actor: actor.id
      }]
    });

    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('requires a studio', () => {
    const film = new Film({
      name: 'Film Name',
      released: 2020,
      cast: [{
        role: 'Star',
        actor: actor.id
      }]
    });

    const { errors } = film.validateSync();

    expect(errors.studio.message).toEqual('Path `studio` is required.');
  });

  it('requires a release date', () => {
    const film = new Film({
      name: 'Film Name',
      studio: studio.id,
      cast: [{
        role: 'Star',
        actor: actor.id
      }]
    });

    const { errors } = film.validateSync();

    expect(errors.released.message).toEqual('Path `released` is required.');
  });
});
