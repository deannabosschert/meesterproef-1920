const Storyblok = require('../../lib/storyblok-instance')

module.exports = async () => {
  const env = process.env.ELEVENTY_ENV
  const version = env === 'production' ? 'published' : 'draft'

  try {
    const result = await Storyblok.get('cdn/stories', { version, starts_with: 'events' })
    const events = result.data.stories
    const eventDetail = getEvents(events)

    return {
      events: eventDetail
    }
  } catch(error) {
    if (process.env.ELEVENTY_ENV === 'development') {
      console.error('Error fetching events: ', error)
    }

    return {
      overviewPage: null,
      events: []
    }
  }
}
