// ----------------------------------------------------------------------

// Native JavaScript date formatting functions (replacing date-fns)

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthsShort = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

export function fDate(date: string | Date): string {
  const d = new Date(date);
  const day = padZero(d.getDate());
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function fDateShortMonth(date: string | Date): string {
  const d = new Date(date);
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

export function fDateShort(date: string | Date): string {
  const d = new Date(date);
  const day = padZero(d.getDate());
  const month = monthsShort[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function fDateTime(date: string | Date): string {
  const d = new Date(date);
  const day = padZero(d.getDate());
  const month = monthsShort[d.getMonth()];
  const year = d.getFullYear();
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function fTimestamp(date: string | Date): number {
  return new Date(date).getTime();
}

export function fDateTimeSuffix(date: string | Date): string {
  const d = new Date(date);
  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = padZero(d.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
}

export function fToNow(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}
