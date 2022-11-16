import defaultSettings from '@/settings'

const title = defaultSettings.title || 'IDS网络入侵检测系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
