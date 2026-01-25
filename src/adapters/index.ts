/**
 * Adapter Components Export
 * 
 * These are the primary exports consumers should use.
 * They provide MUI-based implementations with consistent APIs.
 */

// Provider-Adapter Integration
export type { UIProvider } from './resolver';
export {
  resolveComponentAdapter,
  resolveTemplateAdapter,
  hasComponentAdapter,
  hasTemplateAdapter,
  getComponentAdapterTypes,
  getTemplateAdapterTypes,
  clearAdapterCache,
} from './resolver';

// NOTE: Composite and Template adapters are NOT exported directly
// Use resolveComponentAdapter() and resolveTemplateAdapter() instead
// This prevents conflicts between MUI and internal implementations

// Atomic UI Components
export { Button } from './Button';
export { IconButton } from './IconButton';
export { Input } from './Input';
export { Select } from './Select';
export { Checkbox } from './Checkbox';
export { Table } from './Table';
export { XDataGrid } from './XDataGrid';
export type { XDataGridProps } from './XDataGrid';

// Date Picker Components
export { DatePicker } from './DatePicker';
export { DesktopDatePicker } from './DesktopDatePicker';
export { MobileDatePicker } from './MobileDatePicker';
export { StaticDatePicker } from './StaticDatePicker';

// Time Picker Components
export { TimePicker } from './TimePicker';
export { DesktopTimePicker } from './DesktopTimePicker';
export { MobileTimePicker } from './MobileTimePicker';
export { StaticTimePicker } from './StaticTimePicker';

// DateTime Picker Components
export { DateTimePicker } from './DateTimePicker';
export { DesktopDateTimePicker } from './DesktopDateTimePicker';
export { MobileDateTimePicker } from './MobileDateTimePicker';
export { StaticDateTimePicker } from './StaticDateTimePicker';

// Date Range Picker Components (Requires MUI X Pro)
export { DateRangePicker } from './DateRangePicker';
export { DesktopDateRangePicker } from './DesktopDateRangePicker';
export { MobileDateRangePicker } from './MobileDateRangePicker';
export { StaticDateRangePicker } from './StaticDateRangePicker';

export { TreeView } from './TreeView';
export { SimpleTreeView } from './SimpleTreeView';
export type { SimpleTreeViewProps } from './SimpleTreeView';
export { RichTreeView } from './RichTreeView';
export type { RichTreeViewProps } from './RichTreeView';
export { TreeItem } from './TreeItem';
export type { TreeItemProps } from './TreeItem';
export { LineChart, BarChart, PieChart } from './Charts';
export { Modal } from './Modal';
export { Alert } from './Alert';
export { Tabs } from './Tabs';
export { Breadcrumbs } from './Breadcrumbs';
export { Snackbar } from './Snackbar';
export { Progress } from './Progress';
export { Card } from './Card';
export { Tooltip } from './Tooltip';
export { Badge } from './Badge';
export { Avatar } from './Avatar';
export { Chip } from './Chip';
export { Spinner } from './Spinner';
export { Slider } from './Slider';
export { Switch } from './Switch';
export { RadioGroup } from './RadioGroup';
export { Pagination } from './Pagination';
export { Autocomplete } from './Autocomplete';
export { Drawer } from './Drawer';
export { Menu } from './Menu';
export { Stepper } from './Stepper';
export { Accordion } from './Accordion';
export { Dialog } from './Dialog';
export { AppBar } from './AppBar';
export { List } from './List';
export { Divider } from './Divider';
export { Textarea } from './Textarea';
export { BottomNavigation } from './BottomNavigation';
export { Toolbar } from './Toolbar';
export { SpeedDial } from './SpeedDial';
export { Popover } from './Popover';
export { Backdrop } from './Backdrop';export { ButtonGroup } from './ButtonGroup';
export { ToggleButton } from './ToggleButton';
export { Rating } from './Rating';
export { Skeleton } from './Skeleton';
export { LinearProgress } from './LinearProgress';
export { Typography } from './Typography';
export { PasswordInput } from './PasswordInput';
export { EmailInput } from './EmailInput';
export { NumberInput } from './NumberInput';
export { Timeline } from './Timeline';
export { FloatingActionButton } from './FloatingActionButton';
export { LinkButton } from './LinkButton';
export { SplitButton } from './SplitButton';
export { MultiSelect } from './MultiSelect';
export { TransferList } from './TransferList';
export { FileUpload } from './FileUpload';
export { TextareaAutosize } from './TextareaAutosize';
export { Toast } from './Toast';
export { EmptyState } from './EmptyState';
export { SlideOver } from './SlideOver';
export { BottomSheet } from './BottomSheet';
export { Image } from './Image';
export { Carousel } from './Carousel';
export { Navbar } from './Navbar';
export { Flex } from './Flex';
export { Stack } from './Stack';
export { Box } from './Box';
export { Container } from './Container';
export { Paper } from './Paper';
export { ErrorState } from './ErrorState';
export { SuccessState } from './SuccessState';
export { Lightbox } from './Lightbox';
export { ImageGallery } from './ImageGallery';
export { Thumbnail } from './Thumbnail';
export { Heading } from './Heading';
export { Text } from './Text';
export { DropdownMenu } from './DropdownMenu';
export { ContextMenu } from './ContextMenu';
export { ImageList } from './ImageList';
export { Masonry } from './Masonry';
export { Section } from './Section';
export { Spacer } from './Spacer';
export { Form } from './Form';
export { Toggle } from './Toggle';

// Additional component adapters that remain available
export { Kbd } from './Kbd';
export { Separator } from './Separator';
export { Sheet } from './Sheet';