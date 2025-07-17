#!/usr/bin/env python3
import re
import os

def fix_grid_components(file_path):
    """Fix Material-UI Grid components to use Box components instead"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove Grid from imports and replace with Box if not already there
    if 'Grid,' in content and 'Box,' not in content:
        content = content.replace('Grid,', 'Box,')
    elif 'Grid,' in content and 'Box,' in content:
        content = content.replace('Grid,', '')
        content = re.sub(r',\s*,', ',', content)  # Remove double commas
        
    # Replace Grid container with Box
    content = re.sub(r'<Grid\s+container\s+spacing=\{(\d+)\}>', 
                     r'<Box sx={{ display: "flex", flexWrap: "wrap", gap: \1 }}>', 
                     content)
    
    # Replace Grid items with Box
    content = re.sub(r'<Grid\s+item\s+xs=\{(\d+)\}\s+md=\{(\d+)\}>', 
                     r'<Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "\2 1 0%" } }}>', 
                     content)
    
    content = re.sub(r'<Grid\s+item\s+xs=\{(\d+)\}>', 
                     r'<Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>', 
                     content)
    
    # Close Grid tags
    content = re.sub(r'</Grid>', '</Box>', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed Grid components in {file_path}")

# List of files to fix
files_to_fix = [
    "src/pages/cases/CaseDetailView.tsx",
    "src/pages/violations/ViolationCreate.tsx"
]

for file_path in files_to_fix:
    if os.path.exists(file_path):
        fix_grid_components(file_path)
    else:
        print(f"File not found: {file_path}")

print("Grid component fixes completed!")
