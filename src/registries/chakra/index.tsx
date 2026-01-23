import { ComponentRegistry } from '@json-render/react';
// Core components
import { Button } from './components/button';
import { Text } from './components/text';
import { Badge } from './components/badge';
import { Avatar } from './components/avatar';
import { Icon } from './components/icon';
import { Card } from './components/card';
import { Alert } from './components/alert';
import { Metric } from './components/metric';
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';
import { Switch } from './components/switch';
import { Stack } from './components/stack';
import { Grid } from './components/grid';
import { Container } from './components/container';
import { Table } from './components/table';
import { Chart } from './components/chart';
import { Tabs } from './components/tabs';
// Basic components
import { Image } from './components/basic/image';
import { Link } from './components/basic/link';
// Forms components
import { Textarea } from './components/forms/textarea';
import { Slider } from './components/forms/slider';
import { Radio } from './components/forms/radio';
import { NumberInput } from './components/forms/numberinput';
// Feedback components
import { Progress } from './components/feedback/progress';
import { Skeleton } from './components/feedback/skeleton';
import { Spinner } from './components/feedback/spinner';
import { Tooltip } from './components/feedback/tooltip';
import { Modal } from './components/feedback/modal';
import { Drawer } from './components/feedback/drawer';
// Navigation components
import { Breadcrumb } from './components/navigation/breadcrumb';
import { Menu } from './components/navigation/menu';
// Layout components
import { Box } from './components/layout/box';
import { Flex } from './components/layout/flex';
import { Center } from './components/layout/center';
import { FlexWrap } from './components/layout/wrap';
// Data display components
import { Accordion } from './components/data-display/accordion';
import { List } from './components/data-display/list';
import { Stat } from './components/data-display/stat';
import { Tag } from './components/data-display/tag';

export const chakraRegistry: ComponentRegistry = {
    // Core components
    Button,
    Text,
    Badge,
    Avatar,
    Icon,
    Card,
    Alert,
    Metric,
    Input,
    Select,
    Checkbox,
    Switch,
    Stack,
    Grid,
    Container,
    Table,
    Chart,
    Tabs,
    // Basic components
    Image,
    Link,
    // Forms components
    Textarea,
    Slider,
    Radio,
    NumberInput,
    // Feedback components
    Progress,
    Skeleton,
    Spinner,
    Tooltip,
    Modal,
    Drawer,
    // Navigation components
    Breadcrumb,
    Menu,
    // Layout components
    Box,
    Flex,
    Center,
    Wrap: FlexWrap,
    // Data display components
    Accordion,
    List,
    Stat,
    Tag,
};
