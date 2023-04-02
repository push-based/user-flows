/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

export const AllPreset = {
  assertions: {
    // Not useful or invisible diagnostic audits (off)
    'full-page-screenshot': ['off', {}],
    'critical-request-chains': ['off', {}],
    'final-screenshot': ['off', {}],
    'js-libraries': ['off', {}],
    'largest-contentful-paint-element': ['off', {}],
    'layout-shift-elements': ['off', {}],
    'main-thread-tasks': ['off', {}],
    'network-requests': ['off', {}],
    'network-rtt': ['off', {}],
    'network-server-latency': ['off', {}],
    'resource-summary': ['off', {}],
    'screenshot-thumbnails': ['off', {}],
    'script-treemap-data': ['off', {}],
    'third-party-summary': ['off', {}],
    'total-blocking-time': ['off', {}],
    'user-timings': ['off', {}],
    diagnostics: ['off', {}],
    metrics: ['off', {}],
    // All the rest of the audits (error)
    'apple-touch-icon': ['error', {}],
    'aria-allowed-attr': ['error', {}],
    'aria-command-name': ['error', {}],
    'aria-hidden-body': ['error', {}],
    'aria-hidden-focus': ['error', {}],
    'aria-input-field-name': ['error', {}],
    'aria-meter-name': ['error', {}],
    'aria-progressbar-name': ['error', {}],
    'aria-required-attr': ['error', {}],
    'aria-required-children': ['error', {}],
    'aria-required-parent': ['error', {}],
    'aria-roles': ['error', {}],
    'aria-toggle-field-name': ['error', {}],
    'aria-tooltip-name': ['error', {}],
    'aria-treeitem-name': ['error', {}],
    'aria-valid-attr': ['error', {}],
    'aria-valid-attr-value': ['error', {}],
    'bootup-time': ['error', {}],
    'button-name': ['error', {}],
    'color-contrast': ['error', {}],
    'content-width': ['error', {}],
    'crawlable-anchors': ['error', {}],
    'csp-xss': ['error', {}],
    'cumulative-layout-shift': ['error', {}],
    'definition-list': ['error', {}],
    'document-title': ['error', {}],
    'dom-size': ['error', {}],
    'duplicate-id-active': ['error', {}],
    'duplicate-id-aria': ['error', {}],
    'duplicated-javascript': ['error', {}],
    'efficient-animated-content': ['error', {}],
    'errors-in-console': ['error', {}],
    'first-contentful-paint': ['error', {}],
    'first-meaningful-paint': ['error', {}],
    'font-display': ['error', {}],
    'font-size': ['error', {}],
    'form-field-multiple-labels': ['error', {}],
    'frame-title': ['error', {}],
    'geolocation-on-start': ['error', {}],
    'heading-order': ['error', {}],
    'html-has-lang': ['error', {}],
    'html-lang-valid': ['error', {}],
    'http-status-code': ['error', {}],
    'image-alt': ['error', {}],
    'image-aspect-ratio': ['error', {}],
    'image-size-responsive': ['error', {}],
    'input-image-alt': ['error', {}],
    'inspector-issues': ['error', {}],
    'installable-manifest': ['error', {}],
    'is-crawlable': ['error', {}],
    'is-on-https': ['error', {}],
    'largest-contentful-paint': ['error', {}],
    'lcp-lazy-loaded': ['error', {}],
    'legacy-javascript': ['error', {}],
    'link-name': ['error', {}],
    'link-text': ['error', {}],
    'long-tasks': ['error', {}],
    'mainthread-work-breakdown': ['error', {}],
    'maskable-icon': ['error', {}],
    'max-potential-fid': ['error', {}],
    'meta-description': ['error', {}],
    'meta-refresh': ['error', {}],
    'meta-viewport': ['error', {}],
    'modern-image-formats': ['error', {}],
    'no-document-write': ['error', {}],
    'no-unload-listeners': ['error', {}],
    'no-vulnerable-libraries': ['error', {}],
    'non-composited-animations': ['error', {}],
    'notification-on-start': ['error', {}],
    'object-alt': ['error', {}],
    'offscreen-images': ['error', {}],
    'password-inputs-can-be-pasted-into': ['error', {}],
    'performance-budget': ['error', {}],
    'preload-fonts': ['error', {}],
    'preload-lcp-image': ['error', {}],
    'render-blocking-resources': ['error', {}],
    'robots-txt': ['error', {}],
    'server-response-time': ['error', {}],
    'service-worker': ['error', {}],
    'speed-index': ['error', {}],
    'splash-screen': ['error', {}],
    'tap-targets': ['error', {}],
    'td-headers-attr': ['error', {}],
    'th-has-data-cells': ['error', {}],
    'themed-omnibox': ['error', {}],
    'third-party-facades': ['error', {}],
    'timing-budget': ['error', {}],
    'total-byte-weight': ['error', {}],
    'unminified-css': ['error', {}],
    'unminified-javascript': ['error', {}],
    'unsized-images': ['error', {}],
    'unused-css-rules': ['error', {}],
    'unused-javascript': ['error', {}],
    'uses-http2': ['error', {}],
    'uses-long-cache-ttl': ['error', {}],
    'uses-optimized-images': ['error', {}],
    'uses-passive-event-listeners': ['error', {}],
    'uses-rel-preconnect': ['error', {}],
    'uses-rel-preload': ['error', {}],
    'uses-responsive-images': ['error', {}],
    'uses-text-compression': ['error', {}],
    'valid-lang': ['error', {}],
    'valid-source-maps': ['error', {}],
    'video-caption': ['error', {}],
    accesskeys: ['error', {}],
    bypass: ['error', {}],
    canonical: ['error', {}],
    charset: ['error', {}],
    deprecations: ['error', {}],
    dlitem: ['error', {}],
    doctype: ['error', {}],
    hreflang: ['error', {}],
    interactive: ['error', {}],
    label: ['error', {}],
    list: ['error', {}],
    listitem: ['error', {}],
    plugins: ['error', {}],
    redirects: ['error', {}],
    tabindex: ['error', {}],
    viewport: ['error', {}],
  },
};
